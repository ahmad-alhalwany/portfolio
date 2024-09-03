"use client";
import React, { useState, useRef, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import emailjs from "emailjs-com";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function SignupFormDemo() {
  const [emailContent, setEmailContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;

    if (!email || !name) {
      alert("Please fill in all fields.");
      setIsSending(false);
      return;
    }

    try {
      await sendEmail(email, name, emailContent);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    } finally {
      setIsSending(false);
    }
  };

  const sendEmail = (email: string, name: string, content: string) => {
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: `Message from ${name}`,
      message: content,
    };
  
    return emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
      templateParams,
      process.env.NEXT_PUBLIC_USER_ID as string
    );
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-10">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Ahmad&lsquo;s Portfolio
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Send your email to contact me about work or position.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            type="text"
            required
            ref={nameRef}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Your Email Address</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            required
            ref={emailRef}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="textEditor">Message</Label>
          {isClient && (
            <ReactQuill
              id="textEditor"
              value={emailContent}
              onChange={setEmailContent}
              placeholder="Enter your message here"
              className="h-48"
              theme="snow"
            />
          )}
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="my-1">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Email →"}
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};