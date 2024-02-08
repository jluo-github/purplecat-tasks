import CreateTaskForm from "@/components/CreateTaskForm";
import {
 dehydrate,
 HydrationBoundary,
 QueryClient,
} from "@tanstack/react-query";

const AddTaskPage = () => {
 const queryClient = new QueryClient();
 return (
  <HydrationBoundary state={dehydrate(queryClient)}>
   <CreateTaskForm />
  </HydrationBoundary>
 );
};
export default AddTaskPage;
