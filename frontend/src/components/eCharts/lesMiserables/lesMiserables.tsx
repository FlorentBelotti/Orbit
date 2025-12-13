import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
  [key: string]: any;
}

interface GraphCategory {
  name: string;
  [key: string]: any;
}

interface GraphData {
  nodes: GraphNode[];
  links: any[];
  categories: GraphCategory[];
}

const LesMiserablesGraph: React.FC = () => {
  const [option, setOption] = useState<any>(null);

  useEffect(() => {
    fetch("/mocks/les-miserables.json")
      .then((res) => res.json())
      .then((graph: GraphData) => {
        graph.nodes.forEach((node) => {
          node.label = {
            show: node.symbolSize > 30,
          };
        });

        setOption({
          title: {
            text: "Les Miserables",
            subtext: "Default layout",
            top: "bottom",
            left: "right",
          },
          tooltip: {},
          legend: [
            {
              data: graph.categories.map((a) => a.name),
            },
          ],
          animationDuration: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              name: "Les Miserables",
              type: "graph",
              legendHoverLink: false,
              layout: "force",
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: "right",
                formatter: "{b}",
              },
              lineStyle: {
                color: "source",
                curveness: 0.3,
              },
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  width: 10,
                },
              },
            },
          ],
        });
      });
  }, []);

  if (!option) return <div>Chargement…</div>;

  return (
    <ReactECharts option={option} style={{ height: 600, width: "100%" }} />
  );
};

export default LesMiserablesGraph;
