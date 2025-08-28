import React from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormState,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  test1: z.string().max(5),
  test2: z.string().max(5),
});

type FormSchema = z.infer<typeof formSchema>;

export default function InputForm() {
  const method = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      test1: "",
      test2: "",
    },
  });

  const formState = useFormState({ control: method.control });

  return (
    <FormProvider {...method}>
      <Controller
        name="test1"
        control={method.control}
        render={({ field }) => <input type="text" {...field} />}
      />
      <Controller
        name="test2"
        control={method.control}
        render={({ field }) => <input type="text" {...field} />}
      />
    </FormProvider>
  );
}
