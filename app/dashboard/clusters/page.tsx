import ClusterTable from "./_components/cluster-table";
import data from "./_components/data.json";

export default function ClustersPage() {
  return (
    <div className="flex flex-row h-full">
      <ClusterTable data={data}/>
    </div>
  );
}

