import data from "./_components/data.json";
import ClusterCard from "./_components/cluster-card";
import SpotsPage from "../spots/page";



export default function ClustersPage() {
  return (
    <div className="flex flex-row h-full">
      <ClusterCard data={data} />
    </div>
  );
}

