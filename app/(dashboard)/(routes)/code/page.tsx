"use client";
import Heading from "@/components/heading";
import { Code2, MessageSquare } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const Code = () => {
  const router = useRouter();
  const [message, setMessage] = useState<ChatCompletionMessageParam[]>([]);
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
      console.log(values, "values");
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...message, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessage((current) => [...current, userMessage, response.data]);
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our most advanced conversation model"
        icon={Code2}
        iconColor="text-green-700"
        bgColor="bd-green-700/10"
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
                        placeholder="Simple toggle button using react hook"
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
          {message.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {message.length !== 0 && !isLoading && (
            <div className="flex flex-col-reverse gap-y-4 m-2">
              {message.map((mess) => (
                <div
                  key={mess.content}
                  className={cn(
                    "p-2 w-full flex items-start gap-x-8 rounded-lg",
                    mess.role === "user"
                      ? "bg-gray-800 border border-black/10"
                      : "bg-gray-700"
                  )}
                >
                  {mess.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="bg-black rounded-lg p-1" {...props} />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {mess.content || ""}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Code;
