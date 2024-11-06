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

export default function ActivityView() {
  const [teams, setTeams] = useState<ITeam[]>([]); // Estado para almacenar los equipos
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentSkills, setStudentSkills] = useState<{
    [key: string]: IUser[];
  }>({}); // Estado para almacenar las habilidades
  const [teamStudent, setTeamStudent] = useState<ITeam[]>([]);
  const { user } = useCurrentUser();

  const isProfessor = user?.role === "teacher";

  // Fetch de equipos desde la API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (isProfessor) {
          const data = await getTeams("310a684d-8586-410e-a903-a0e23966226e"); // Llama a la función para obtener equipos
          console.log("Datos de la API:", data); // Verifica el formato de los datos

          // Filtrar equipos duplicados
          const uniqueTeams = data.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          );

          setTeams(uniqueTeams); // Actualiza el estado con los datos obtenidos

          // Ahora obtenemos las habilidades de los estudiantes
          const skillsPromises = uniqueTeams.flatMap((team) =>
            team.users.map(async (user: IUser) => {
              const skills: IUser[] = await getStudentsSkills(user.id); // Supone que getStudentsSkills acepta un ID de usuario
              return { id: user.id, skills };
            })
          );

          // Esperamos a que se resuelvan todas las promesas
          const skillsResults = await Promise.all(skillsPromises);

          // Creamos un objeto donde las claves son los IDs de los estudiantes y los valores son sus habilidades
          const skillsMap = skillsResults.reduce((acc, { id, skills }) => {
            acc[id] = skills; // Directly assign the skills array
            return acc;
          }, {} as { [key: string]: IUser[] });

          setStudentSkills(skillsMap); // Actualiza el estado con las habilidades
        } else {
          const response = await studentTeam("310a684d-8586-410e-a903-a0e23966226e", "f6bc67f6-94a8-4d1d-acbd-5f23fdaa947c");
          setTeamStudent(response)
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams(); // Ejecuta el fetch al cargar el componente
  }, [isProfessor]);

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
        <h1 className="text-3xl font-bold">Next</h1>

        <div className="w-full h-px bg-gray-500 my-4" />

        <div className="text-semibold">
          <p>Teacher: Diego Mueses</p>
        </div>

        <p className="text-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>

        <div className="mt-8 bg-sidebar p-4">
          {
            isProfessor ? (
              <p className="text-lg font-bold">Teams</p>
            ) : (
              <p className="text-lg font-bold">Teams</p>
            )
          }
          {
            isProfessor && <Input
            placeholder="Search team"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="my-4"
          />
          }

          {isProfessor ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Members</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <p
                        className="text-blue-500 font-bold cursor-pointer"
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
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  teamStudent ? (
                    teamStudent.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>
                          <p
                            className="text-blue-500 font-bold cursor-pointer"
                            onClick={() => handleTeamClick(team)}
                          >
                            {team.name}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p>
                            Role
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <p>You dont have a team</p>
                  )
                }
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTeam?.name}</DialogTitle>
          </DialogHeader>
          <div>
            <p className="font-semibold">Members</p>
            <ul>
              {selectedTeam?.users.map((user) => {
                const skills = studentSkills[user.id] || []; // Obtener habilidades del estado
                return (
                  <li key={user.id}>
                    <span className="font-bold">
                      {user.name} {user.last_name}
                    </span>
                    : {skills.map((skill) => skill.name).join(", ")}
                  </li>
                );
              })}
            </ul>
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </div>
  );
}
