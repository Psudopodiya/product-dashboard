import { Chart, ChartConfiguration } from "chart.js";
import { useEffect, useRef } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  cost_price: string;
  selling_price: string;
  description: string;
  stock_available: number;
  units_sold: number;
  customer_rating: number;
  demand_forecast: number | null;
  optimized_price: string;
}

interface DemandPriceChartProps {
  products: Product[];
}

const DemandPriceChart = ({ products }: DemandPriceChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && products.length > 0) {
      const chartData = products
        .filter((p) => p.demand_forecast !== null)
        .map((product) => ({
          name: product.name,
          price: parseFloat(product.selling_price),
          demand: product.demand_forecast as number,
          category: product.category,
        }));

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const config: ChartConfiguration<"line"> = {
        type: "line",
        data: {
          labels: chartData.map((d) => d.name),
          datasets: [
            {
              label: "Selling Price ($)",
              data: chartData.map((d) => d.price),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              yAxisID: "y",
              tension: 0.1,
            },
            {
              label: "Demand Forecast (units)",
              data: chartData.map((d) => d.demand),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              yAxisID: "y1",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Price vs Demand Analysis",
              font: { size: 18 },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.parsed.y;
                  return `${label}: ${
                    context.datasetIndex === 0
                      ? `$${value.toFixed(2)}`
                      : `${value} units`
                  }`;
                },
                afterLabel: (context) => {
                  const data = chartData[context.dataIndex];
                  return `Category: ${data.category}`;
                },
              },
            },
          },
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Price ($)",
                font: { weight: "bold" },
              },
              min: 0,
              max: 500,
              ticks: {
                callback: (value) => `$${value}`,
                stepSize: 50,
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Demand (units)",
                font: { weight: "bold" },
              },
              min: 0,
              grid: { drawOnChartArea: false },
            },
          },
        },
      };

      chartInstance.current = new Chart(chartRef.current, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [products]);

  return (
    <div className="w-full mb-4 h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DemandPriceChart;
