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

  console.log(products);

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

      const priceColor = "rgba(0, 255, 213, 1)";
      const demandColor = "rgba(149, 76, 233, 1)";

      const config: ChartConfiguration<"line"> = {
        type: "line",
        data: {
          labels: chartData.map((d) => d.name),
          datasets: [
            {
              label: "Selling Price ($)",
              data: chartData.map((d) => d.price),
              backgroundColor: priceColor,
              borderColor: priceColor,
              borderWidth: 2,
              yAxisID: "y",
              tension: 0.1,
            },
            {
              label: "Demand Forecast (units)",
              data: chartData.map((d) => d.demand),
              backgroundColor: demandColor,
              borderColor: demandColor,
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
              color: "rgba(220, 220, 220, 1)", // Light grey for title
              padding: { bottom: 10 },
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
            legend: {
              position: "bottom",
              labels: {
                color: "rgba(220, 220, 220, 1)", // Light grey for legend labels
                usePointStyle: true,
                padding: 20,
                pointStyle: "circle",
                borderRadius: 5,
                boxHeight: 5,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "rgba(220, 220, 220, 1)", // Light grey for x-axis ticks
              },
              grid: {
                color: "rgba(100, 100, 100, 0.3)", // Darker grey for x-axis grid
              },
              border: {
                color: "rgba(150, 150, 150, 0.8)", // Medium grey for x-axis line
              },
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Price ($)",
                font: { weight: "bold" },
                color: "rgba(220, 220, 220, 1)", // Light grey for y-axis title
              },
              min: 0,
              max: 500,
              ticks: {
                callback: (value) => `$${value}`,
                stepSize: 50,
                color: "rgba(220, 220, 220, 1)", // Light grey for y-axis ticks
              },
              grid: {
                color: "rgba(100, 100, 100, 0.3)", // Darker grey for y-axis grid
              },
              border: {
                color: "rgba(150, 150, 150, 0.8)", // Medium grey for y-axis line
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
                color: "rgba(220, 220, 220, 1)", // Light grey for y1-axis title
              },
              min: 0,
              grid: {
                drawOnChartArea: false,
                color: "rgba(100, 100, 100, 0.3)", // Darker grey for y1-axis grid
              },
              ticks: {
                color: "rgba(220, 220, 220, 1)", // Light grey for y1-axis ticks
              },
              border: {
                color: "rgba(150, 150, 150, 0.8)", // Medium grey for y1-axis line
              },
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
    <div className="w-full mb-4 h-[300px] bg-black rounded-lg py-2">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DemandPriceChart;
