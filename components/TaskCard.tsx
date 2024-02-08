import { TaskType } from "@/utils/types";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import Link from "next/link";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import TaskInfo from "./TaskInfo";
import DeleteTaskButton from "./DeleteTaskButton";

const TaskCard = ({ task }: { task: TaskType }) => {
 // console.log(new Date(task.createdAt));
 const date = new Date(task.createdAt).toLocaleDateString();

 return (
  <Card className='bg-muted'>
   <CardHeader>
    <CardTitle>{task.title}</CardTitle>

    <CardDescription>{task.note}</CardDescription>
   </CardHeader>

   <Separator />

   <CardContent className='mt-4 grid grid-cols-2 gap-4'>
    {/* card info */}
    <TaskInfo icon={<Briefcase />} text={task.mode} />
    <TaskInfo icon={<MapPin />} text={task.location} />
    <TaskInfo icon={<CalendarDays />} text={date} />

    <Badge className='w-32  justify-center'>
     <TaskInfo icon={<RadioTower className='w-4 h-4' />} text={task.status} />
    </Badge>
   </CardContent>

   <CardFooter className='flex gap-4'>
    <Button asChild size='sm'>
     <Link href={`/tasks/${task.id}`}>Edit</Link>
    </Button>

    <DeleteTaskButton id={task.id} />
   </CardFooter>
  </Card>
 );
};
export default TaskCard;
