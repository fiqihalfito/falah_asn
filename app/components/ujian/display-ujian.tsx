import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type { Pilihan, SoalUnitPartial } from "~/lib/constants/soal"
import { NavLink, useFetcher } from "react-router"
// import { KatexOutput } from "./matchjaxoutput"
import Latex from "react-latex"


export interface DisplaySoalProps {
    soalUnit: SoalUnitPartial,
    noSoal: number,
    sesiUjianId: string,
    LSjawaban?: string
}

export default function DisplaySoal({ soalUnit, noSoal, sesiUjianId, LSjawaban }: DisplaySoalProps) {


    const letters = ["A", "B", "C", "D", "E", "F", "G"]
    const pilihan: Pilihan = soalUnit.pilihan ? JSON.parse(soalUnit.pilihan) : [];
    const fetcher = useFetcher({ key: "simpanJawabanLocalStorage" })
    const currentJawaban = fetcher.formData?.get("jawabanTerpilih") as string || LSjawaban

    console.log("soal", soalUnit.pertanyaan);


    return (
        // <main className="flex-1 h-full flex flex-col p-8 border-b-black border">
        <main className="h-full flex flex-col p-8">

            <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardDescription>Pertanyaan {noSoal} dari {110}  </CardDescription>
                    <CardTitle className="text-2xl">
                        <Latex>{soalUnit.pertanyaan!}</Latex>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-6 overflow-hidden">
                    <ScrollArea className="flex-1">
                        <fetcher.Form method="post" >
                            <div className="space-y-6">
                                {/* {question.image && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                                    <Image
                                        src={question.image}
                                        alt={`Illustration for question ${question.id}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={question.imageHint}
                                    />
                                </div>
                            )} */}
                                <input type="hidden" name="soalId" defaultValue={soalUnit.soalId} />
                                <RadioGroup
                                    defaultValue={currentJawaban}
                                    // onValueChange={handleSelect}
                                    name="jawabanTerpilih"
                                    className="space-y-4"
                                >
                                    {pilihan.map((o, i) => (
                                        <Label
                                            key={i}
                                            htmlFor={`${o.id}-${i}`}
                                            className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:border-primary"
                                        >
                                            <RadioGroupItem value={o.id} id={`${o.id}-${i}`} type="submit" />
                                            <span className="text-base">{letters[i]}{". "}
                                                <Latex>
                                                    {o.j}
                                                </Latex>
                                            </span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                        </fetcher.Form>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="justify-between border-t pt-6">
                    {/* <Button variant="outline" onClick={onPrev} disabled={isFirst}> */}

                    {noSoal === 1 ? (
                        <Button variant="outline" size={"lg"} disabled aria-disabled={true} className="select-none">
                            <ChevronLeftIcon className="mr-2 h-4 w-4" />
                            Sebelumnya
                        </Button>
                    ) : (
                        <Button variant="outline" asChild size={"lg"}>
                            <NavLink to={`/app/ujian/sesi/${sesiUjianId}/soal/${noSoal - 1}`}>
                                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                                Sebelumnya
                            </NavLink>
                        </Button>
                    )}


                    {/* <Button onClick={onNext} disabled={isLast} className="bg-accent hover:bg-accent/90"> */}
                    {noSoal === 110 ? (
                        <Button variant={'outline'} size={"lg"} disabled aria-disabled={true} className="select-none">
                            Selanjutnya
                            <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button asChild variant={'outline'} size={"lg"}>
                            <NavLink to={`/app/ujian/sesi/${sesiUjianId}/soal/${noSoal + 1}`}>
                                Selanjutnya
                                <ChevronRightIcon className="ml-2 h-4 w-4" />
                            </NavLink>
                        </Button>
                    )}

                </CardFooter>
            </Card>

        </main>
    )
}