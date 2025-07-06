import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Phone, AlertTriangle, Settings, Camera, Clock } from "lucide-react";

export default function QuesAns() {
  return (
    <div className="flex max-w-6xl mx-auto p-6 gap-6 shadow  rounded-xl">
      {/* Left: Phone Image & Model */}
      <Card className="w-64 shadow-lg">
        <CardContent className="flex flex-col items-center pt-6">
          <img
            src="https://m.media-amazon.com/images/I/413eZrKrgnL._SX300_SY300_QL70_FMwebp_.jpg"
            alt="Samsung F13"
            className="rounded-md"
          />
          <p className="text-lg font-bold mt-4 text-center">F13 4/128</p>
        </CardContent>
      </Card>

      {/* Right: Questions */}
      <div className="flex-1 space-y-6">
        <h2 className="text-center text-2xl font-semibold ">
          Answer Few Questions
        </h2>

        {/* Question 1 */}
        <QuestionBlock
          number={1}
          icon={<Phone className="w-5 h-5 " />}
          question="Does Your Phone Switch On?"
        />

        {/* Question 2 */}
        <QuestionBlock
          number={2}
          icon={<AlertTriangle className="w-5 h-5" />}
          question="Do You Have Any Physical Defects On Your Device?"
          hint="(Scratches / Dents)"
        />

        {/* Question 3 */}
        <QuestionBlock
          number={3}
          icon={<Settings className="w-5 h-5" />}
          question="Do You Have Any Functional Defects In Your Device?"
        />

        {/* Question 4 */}
        <QuestionBlock
          number={4}
          icon={<Camera className="w-5 h-5" />}
          question="Are You Facing Any Issue In Your Camera?"
        />

        {/* Question 5 */}
        <div className="border-t pt-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-1" />
            <div>
              <p className="font-medium text-lg">
                How Old is Your Smartphone (Duration)?
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Checkbox id="olderThan12" />
                <Label htmlFor="olderThan12">More than 12 Month Old</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <Button className="bg-blue-600 hover:bg-blue-700">Next</Button>
        </div>
      </div>
    </div>
  );
}

function QuestionBlock({
  number,
  icon,
  question,
  hint,
}: {
  number: number;
  icon: React.ReactNode;
  question: string;
  hint?: string;
}) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <div className="flex flex-col items-center gap-1.5">
        <div className="bg-blue-500 text-white rounded-full w-5 h-5 text-center text-xs flex items-center justify-center pb">
          {number}
        </div>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-lg">{question}</p>
        {hint && <p className="text-sm text-blue-500">{hint}</p>}
        <RadioGroup className="flex gap-6 mt-2" defaultValue="no">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id={`q${number}-yes`} />
            <Label htmlFor={`q${number}-yes`}>Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id={`q${number}-no`} />
            <Label htmlFor={`q${number}-no`}>No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
