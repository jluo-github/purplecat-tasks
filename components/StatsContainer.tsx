"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard from "./StatsCard";

const StatsContainer = () => {
 const { data } = useQuery({
  queryKey: ["stats"],
  queryFn: () => getStatsAction(),
 });

 return (
  <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
   <StatsCard title='pending tasks' value={data?.pending || 0} />
   <StatsCard title='task completed' value={data?.completed || 0} />
   <StatsCard title='tasks canceled' value={data?.canceled || 0} />
  </div>
 );
};
export default StatsContainer;
