import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Courses() {
    return (
        <main className="overflow-hidden">
            <h1 className="text-3xl font-semibold mb-5">Courses</h1>

            <div className="flex justify-center mb-8 w-full relative">
                <input
                    type="text"
                    placeholder="Search course"
                    className="w-3/4 pl-10 pr-4 py-2 rounded-md bg-[#1F1F1F] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary "
                />
                <div className="absolute inset-y-0 left-[12.5%] flex items-center pl-3 pointer-events-none">
                    <Search className="text-white font-semibold" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 ">
                <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                    <CardHeader className="p-0">
                        <Image
                            src="/images/nebulosa.webp"
                            width={500}
                            height={500}
                            alt="logo"
                            quality={50}
                            className="w-full h-[200px] object-cover rounded-lg" // Agrega rounded-lg aquí
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                    </CardContent>
                </Card>


                <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                    <CardHeader className="p-0">
                        <Image
                            src="/images/nebulosa.webp"
                            width={500}
                            height={500}
                            alt="logo"
                            quality={50}
                            className="w-full h-[200px] object-cover rounded-lg" // Agrega rounded-lg aquí
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                    </CardContent>
                </Card>

                <Card className="w-full scale-95 hover:scale-100 hover:cursor-pointer transition-all ease-linear rounded-lg overflow-hidden">
                    <CardHeader className="p-0">
                        <Image
                            src="/images/nebulosa.webp"
                            width={500}
                            height={500}
                            alt="logo"
                            quality={50}
                            className="w-full h-[200px] object-cover rounded-lg" // Agrega rounded-lg aquí
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl font-bold text-white">Compunet 3</CardTitle>
                    </CardContent>
                </Card>

                <Card className="w-full h-[265px] scale-95 flex justify-center items-center">
                    <CardContent className="text-center gap-2 flex flex-col py-2">
                        <p>Add a courses</p>
                        <Link href="#">
                            <Button>Add course</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

        </main>
    );
}