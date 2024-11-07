"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ITeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { getTeams } from "@/services/teamService";
import { getStudentsSkills } from "@/services/userService";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { studentTeam } from "@/services/courseService";
import { useParams } from "next/navigation";
import { findOne } from "@/services/activityService";
import { IActivity } from "@/interfaces/activity.interface";
import RubricForm from "@/components/forms/RubricForm";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ActivityView() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentSkills, setStudentSkills] = useState<{
    [key: string]: IUser[];
  }>({});
  const [teamStudent, setTeamStudent] = useState<ITeam[]>([]);
  const { user } = useCurrentUser();
  const isProfessor = user?.role === "teacher";
  const params = useParams();
  const idActivity = params.idActivity as string;
  const idCourse = params.id as string;

  const [activity, setActivity] = useState<IActivity | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await findOne(idActivity);
        setActivity(data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [idActivity]);

  // Inside the useEffect hook
  useEffect(() => {
    const fetchTeamsAndSkills = async () => {
      try {
        if (isProfessor) {
          const data = await getTeams(idCourse);
          const uniqueTeams = data.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          );

          setTeams(uniqueTeams);

          const skillsPromises = uniqueTeams.flatMap((team) =>
            team.users.map(async (user: IUser) => {
              const skills: IUser[] = await getStudentsSkills(user.id);
              return { id: user.id, skills };
            })
          );

          const skillsResults = await Promise.all(skillsPromises);
          const skillsMap = skillsResults.reduce((acc, { id, skills }) => {
            acc[id] = skills;
            return acc;
          }, {} as { [key: string]: IUser[] });

          setStudentSkills(skillsMap);
        } else if (user?.role === "student") {
          const response = await studentTeam(idCourse, user?.user_id as string);

          setTeamStudent(response);

          // Fetch and map skills for each student in the team
          const skillsPromises = response.map(async (user: ITeam) => {
            const skills = await getStudentsSkills(user.id);
            return { id: user.id, skills };
          });

          const skillsResults = await Promise.all(skillsPromises);
          const skillsMap = skillsResults.reduce((acc, { id, skills }) => {
            acc[id] = skills;
            return acc;
          }, {} as { [key: string]: IUser[] });

          setStudentSkills(skillsMap);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeamsAndSkills();
  }, [idCourse, isProfessor, user?.role, user?.user_id]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamClick = (team: ITeam) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="relative w-full h-64">
        <Image
          src="/images/nebulosa.webp"
          width={500}
          height={500}
          alt="logo"
          quality={50}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">{activity?.name}</h1>

        <div className="w-full h-px bg-gray-500 my-4" />

        <p className="text-semibold">{activity?.description}</p>

        <div className="mt-8 bg-sidebar p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-bold">Teams</p>
            <RubricForm idActivity={idActivity} />
          </div>
          {isProfessor && (
            <Input
              placeholder="Search team"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="my-4"
            />
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isProfessor ? "Members" : "Team Name"}</TableHead>
                <TableHead>{isProfessor ? "Role" : "Members"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isProfessor ? (
                filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <p
                        className="text-primary font-bold cursor-pointer"
                        onClick={() => handleTeamClick(team)}
                      >
                        {team.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p>
                        {team.users
                          .map((user) => `${user.name} ${user.last_name}`)
                          .join(" - ")}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : teamStudent.length > 0 ? (
                teamStudent.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <p className="text-white font-bold">{team.name}</p>
                    </TableCell>
                    <TableCell>
                      <p>
                        {studentSkills[team.id] &&
                        studentSkills[team.id].length > 0
                          ? (studentSkills[team.id] || [])
                              .map((skill) => skill.name)
                              .join(", ")
                          : "None"}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>You don&apos;t have a team</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTeam?.name}</DialogTitle>
            <DialogDescription>Members of the team</DialogDescription>
          </DialogHeader>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell className="font-semibold">Last Name</TableCell>
                <TableCell className="font-semibold">Skills</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTeam?.users.map((user) => {
                const skills = studentSkills[user.id] || [];
                return (
                  <TableRow key={user.id}>
                    <TableCell className="p-2 border-t">{user.name}</TableCell>
                    <TableCell className="p-2 border-t">
                      {user.last_name}
                    </TableCell>
                    <TableCell className="p-2 border-t">
                      {skills.length > 0
                        ? skills.map((skill) => skill.name).join(", ")
                        : "No skills"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </div>
  );
}
