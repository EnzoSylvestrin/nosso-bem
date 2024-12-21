'use client';

import { useState } from "react";

import { useUser } from "@clerk/nextjs";

import { QuestionType } from "@prisma/client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CardTypes } from "@/components/gameCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";

import { CardColors } from "@/constants";

import { Textarea } from "@/components/ui/textarea";
import { ny } from "@/lib/utils";
import { CreateQuestion } from "@/components/serverless/createQuestion";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const newQuestionSchema = z.object({
    type: z.nativeEnum(QuestionType),
    title: z.string({ required_error: "O titulo é obrigatório." }).min(1, {
        message: "O titulo é obrigatório.",
    }),
    description: z.string().optional(),
});

type NewQuestionSchema = z.infer<typeof newQuestionSchema>;

const NewQuestionPage = () => {
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState<string | null>(null);

    const form = useForm<NewQuestionSchema>({
        resolver: zodResolver(newQuestionSchema),
    })

    const onSubmit = async (values: NewQuestionSchema) => {
        setIsLoading(true);

        try {
            await CreateQuestionForm(values);

            form.reset();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.log(error);

            toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const CreateQuestionForm = async (values: NewQuestionSchema) => {
        await CreateQuestion({
            ...values,
            userData: {
                image: user?.imageUrl,
                name: user?.firstName ?? undefined,
                email: user?.emailAddresses[0].emailAddress,
            }
        });
    }

    return (
        <div 
            className={ny(
                "w-full flex flex-col items-center gap-8 p-5 py-6 rounded-lg bg-gray-50 dark:bg-black max-w-md z-[1000] shadow-lg border-2 border-black dark:border-white",
            )}
            style={{
                ...(color && { borderColor: color }), 
            }}
        >
            <h1 
                className="text-2xl font-bold text-gray-900 dark:text-white mt-2"
                style={{
                    ...(color ? { color } : {}),
                }}
            >
                Adicione uma questão
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 items-center justify-center text-gray-900 dark:text-white">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel style={{
                                    ...(color ? { color } : {}),
                                }}>
                                    Tipo *
                                </FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value) => {
                                        field.onChange(value)
                                        setColor(CardColors[value as CardTypes])
                                    }}>
                                        <SelectTrigger 
                                            className="w-full"
                                            style={{
                                                ...(color ? { borderColor: color } : {}),
                                            }}
                                        >
                                            <SelectValue placeholder="Selecione o tipo..." className="p-0" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[1000] cursor-pointer">
                                            <SelectGroup>
                                                {Object.values(QuestionType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        <SelectLabel>{type}</SelectLabel>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel style={{
                                    ...(color ? { color } : {}),
                                }}>
                                    Titulo *
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Escreva o titulo..." 
                                        {...field}
                                        style={{
                                            ...(color ? { borderColor: color } : {}),
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel 
                                    style={{
                                        ...(color ? { color } : {}),
                                    }}
                                >
                                    Descrição 
                                </FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Escreva a descrição..." 
                                        {...field}
                                        className="max-h-[200px]"
                                        style={{
                                            ...(color ? { borderColor: color } : {}),
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        style={{
                            ...(color ? { backgroundColor: color } : {}),
                        }}
                        className="mt-2"
                        disabled={isLoading}
                    >
                        {
                            isLoading && (
                                <ReloadIcon className="mr-2 size-4 animate-spin" />
                            )
                        }
                        Adicionar
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default NewQuestionPage;