import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";

const DeleteTaskButton = ({ id }: { id: string }) => {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 const { mutate, isPending } = useMutation({
  mutationFn: (id: string) => deleteTaskAction(id),

  onSuccess: (data) => {
   if (!data) {
    toast({
     description: "There was an error",
    });
    return;
   }
   queryClient.invalidateQueries({ queryKey: ["tasks"] });
   queryClient.invalidateQueries({ queryKey: ["stats"] });
   queryClient.invalidateQueries({ queryKey: ["charts"] });

   toast({ description: "Task removed" });
  },
 });

 return (
  <Button size='sm' disabled={isPending} onClick={() => mutate(id)}>
   {isPending ? "Deleting..." : "Delete"}
  </Button>
 );
};
export default DeleteTaskButton;
