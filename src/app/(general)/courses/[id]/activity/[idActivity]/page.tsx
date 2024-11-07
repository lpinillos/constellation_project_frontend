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
import { createRubricGrade, getRubricByActivityId, getRubricGradeByRubricId } from "@/services/rubricService";
import { IRubric } from "@/interfaces/rubric.interface";
import StudentEvalForm from "@/components/forms/StudentEvalForm";
import { Button } from "@/components/ui/button";
import { IRubricGrade } from "@/interfaces/rubric_grade.interface";
// import StudentEvalForm from "@/components/forms/StudentEvalForm";

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
  const [rubric, setRubric] = useState<IRubric[]>();

  const [activity, setActivity] = useState<IActivity | null>(null);
  const [rubric_grade, setRubricGrade] = useState<IRubricGrade[]>([]);

  // const [rubric_grade, setRubricGrade] = useState<IRubric | null>(null);



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

  useEffect(() => {
    try {
      const fetchRubric = async () => {
        const rubric = await getRubricByActivityId(idActivity);
        setRubric(rubric);
      };
      fetchRubric();
    } catch (error) {
      console.error(error);
    }
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


  useEffect(() => {
    const fetchRubricGrade = async () => {
      try {

        const grade = await getRubricGradeByRubricId();
        setRubricGrade(grade);
        console.log(grade);

      } catch (error) {
        console.error("Error fetching rubric grade:", error);
      }
    };
    fetchRubricGrade();
  });


  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamClick = (team: ITeam) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };


  const handleRubricClick = async (rubricId: string, studentEval: string) => {
    const response = await createRubricGrade({ rubricId, studentEval });
    console.log(response);
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
                <TableHead>{isProfessor ? "Members" : "Name"}</TableHead>
                <TableHead>{isProfessor ? "Role" : "Skill"}</TableHead>
                {isProfessor ? (
                  <>  </>
                ) : (
                  <TableHead>{rubric?.[0] ? "Evaluate" : ""}</TableHead>
                )}
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
              ) : teamStudent ? (
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
                    <TableCell>
                      {rubric?.[0] ? (
                        <StudentEvalForm rubricId={rubric[0].id} idStu={user?.user_id} idStuEval={team.id} />
                      ) : (
                        <></>
                      )}
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
                <TableCell className="font-semibold">Grades</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
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
                    <TableCell className="p-2 border-t">
                      {rubric_grade
                        .filter((grade) => grade.studentEval.id === user.id && grade.id === rubric?.[0]?.id)
                        .map((grade) => grade.grade)
                        .join(", ") || "No grade"}
                    </TableCell>
                    <TableCell>
                      <Button className="text-white bg-primary p-2 rounded-lg" onClick={() => {
                        if (rubric?.[0]?.id && user?.id) {
                          handleRubricClick(rubric[0].id, user.id);
                        }
                      }}>
                        Generate Grade
                      </Button>
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
