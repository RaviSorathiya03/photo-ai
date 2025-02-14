"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileUploadDemo } from "@/components/global/FileUpload";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    zipUrl: "",
    type: "Man",
    age: "",
    ethnicity: "White",
    eyeColor: "Brown",
    bald: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = () => {
    setFormData((prev) => ({ ...prev, bald: !prev.bald }));
  };

  async function trainModel() {
    const response = await axios.post(`${BACKEND_URL}/ai/training`, formData);
    router.push("/");
    console.log(response);
  }

  return (
   <div className="w-screen h-screen flex justify-center items-center  m-10 overflow-y-scroll">
     <Card className="w-[650px] p-10 m-10 cursor-all-scroll">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your Model" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="Enter Your Age" type="number" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Your Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Others">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Select onValueChange={(value) => handleSelectChange("ethnicity", value)}>
                <SelectTrigger id="ethnicity">
                  <SelectValue placeholder="Select Ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="AsianAmerican">Asian American</SelectItem>
                  <SelectItem value="SouthEastAmerican">South East American</SelectItem>
                  <SelectItem value="MiddleEastern">Middle Eastern</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eyeColor">Eye Colour</Label>
              <Select onValueChange={(value) => handleSelectChange("eyeColor", value)}>
                <SelectTrigger id="eyeColor">
                  <SelectValue placeholder="Select Eye Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <Label htmlFor="bald">Bald</Label>
              <Switch checked={formData.bald} onCheckedChange={handleSwitchChange} />
            </div>
            <div className="flex items-center gap-x-2">
              <FileUploadDemo onUploadDone={(url) => setFormData((prev) => ({ ...prev, zipUrl: url }))} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="reset" onClick={() => router.push("/")}>Cancel</Button>
        <Button disabled={!formData.zipUrl || !formData.age} onClick={trainModel}>Create Model</Button>
      </CardFooter>
    </Card>
   </div>
  );
}
