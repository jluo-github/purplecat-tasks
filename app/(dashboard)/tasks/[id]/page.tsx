import EditTaskForm from "@/components/EditTaskForm";
import { getSingleTaskAction } from "@/utils/actions";

import {
 dehydrate,
 HydrationBoundary,
 QueryClient,
} from "@tanstack/react-query";

const TaskDetailPage = async ({ params }: { params: { id: string } }) => {
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
  queryKey: ["task", params.id],
  queryFn: () => getSingleTaskAction(params.id),
 });

 return (
  <HydrationBoundary state={dehydrate(queryClient)}>
   <EditTaskForm taskId={params.id} />
  </HydrationBoundary>
 );
};
export default TaskDetailPage;
