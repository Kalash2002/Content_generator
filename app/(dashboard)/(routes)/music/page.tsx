"use client";
import Heading from "@/components/heading";
import {
  Code2,
  MessageSquare,
  Music2,
  Music2Icon,
  Music3,
  MusicIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formVarification } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const Music = () => {
  //const router = useRouter();
  const [music, setMusic] = useState<string>();
  const resolver = async (values: any) => {
    const validatedData = formVarification.parse(values);
    return { values: validatedData, errors: {} };
  };

  const form = useForm({
    resolver,
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formVarification>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);
      console.log(response);

      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Our most advanced conversation model"
        icon={MusicIcon}
        iconColor="text-green-600"
        bgColor="bd-green-600/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg
                border
                border-white/50
                w-full
                p-2
                px-2
                md:px-3
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className=" text-black font-semibold border-0 p-1 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Piano Solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="bg-white/20 col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 rounded-md">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-black">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No conversation started." />}
          {music && !isLoading && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;
