import TasksList from "@/components/TasksList";
import SearchForm from "@/components/SearchForm";
import {
 dehydrate,
 HydrationBoundary,
 QueryClient,
} from "@tanstack/react-query";
import { getAllTasksAction } from "@/utils/actions";

const AllTasksPage = async () => {
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
  queryKey: ["tasks", "", "all", 1],
  queryFn: () => getAllTasksAction({}),
 });
 return (
  <HydrationBoundary state={dehydrate(queryClient)}>
   <SearchForm />
   <TasksList />
  </HydrationBoundary>
 );
};
export default AllTasksPage;
