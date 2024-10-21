"use client";
import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { DEFAULT_EDITOR_VALUE } from "@/constants";
import { Card } from "../ui/card";

export default function MDXEditor() {
  const [value, setValue] = useState<JSONContent>(DEFAULT_EDITOR_VALUE);
  console.log(value);
  return (
  <Card className="h-full w-full ">
        <Editor initialValue={value} onChange={setValue} />
  </Card>
  );
}