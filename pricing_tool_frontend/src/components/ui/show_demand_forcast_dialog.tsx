import type { Product } from "@/types/types";
import Chart from "chart.js/auto";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "./";
import DemandPriceChart from "./chart";

interface DemandForecastDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: Product[];
}

export function DemandForecastDialog({
  open,
  onOpenChange,
  selectedProducts,
}: DemandForecastDialogProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const generatePricePoints = (basePrice: number) => {
    const priceRange = basePrice * 0.5;
    const minPrice = basePrice - priceRange / 2;
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(minPrice + (priceRange * i) / 9);
    }
    return points;
  };

  const generateDemandPoints = (
    basePrice: number,
    baseDemand: number,
    pricePoints: number[]
  ) => {
    return pricePoints.map((price) => {
      const ratio = basePrice / price;
      const randomFactor = 0.8 + Math.random() * 0.4;
      return baseDemand * ratio * randomFactor;
    });
  };

  useEffect(() => {
    if (!open || !chartRef.current || selectedProducts.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const colors = ["#01e0b4", "#6366f1", "#f59e0b", "#ec4899"];

    const datasets = selectedProducts.map((product, index) => {
      const basePrice = Number.parseFloat(product.selling_price);
      const baseDemand =
        product.demand_forecast || Math.floor(product.units_sold * 1.2);
      const pricePoints = generatePricePoints(basePrice);
      const demandPoints = generateDemandPoints(
        basePrice,
        baseDemand,
        pricePoints
      );

      return {
        label: product.name,
        data: pricePoints.map((price, i) => ({
          x: price,
          y: demandPoints[i],
        })),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + "20",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      };
    });

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Selling Price ($)",
              color: "#07cfa6",
            },
            grid: {
              color: "#333333",
            },
            ticks: {
              color: "#ffffff",
            },
          },
          y: {
            title: {
              display: true,
              text: "Product Demand",
              color: "#9e6ddd",
            },
            grid: {
              color: "#333333",
            },
            ticks: {
              color: "#ffffff",
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ffffff",
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#01e0b4",
            bodyColor: "#ffffff",
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: Demand ${Math.round(
                  context.parsed.y
                )} at $${context.parsed.x.toFixed(2)}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [open, selectedProducts]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#242424] p-0 border-none text-white min-w-[80%]">
        <DialogTitle className="sr-only">Demand Forecast</DialogTitle>
        <div className="bg-black w-full flex items-center justify-between px-6 py-4">
          <h2 className="text-white text-xl font-semibold">Demand Forecast</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="bg-red-500 text-black hover:text-white focus:outline-none rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pb-5 text-sm">
          <DemandPriceChart products={selectedProducts} />

          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full rounded-2xl">
              <thead className="sticky top-0 bg-black">
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3">Product Name</th>
                  <th className="text-left p-3 border-x border-x-gray-600">
                    Product Category
                  </th>
                  <th className="text-left p-3 border-x border-x-gray-600">
                    Cost Price
                  </th>
                  <th className="text-left p-3 border-x border-x-gray-600">
                    Selling Price
                  </th>
                  <th className="text-left p-3 border-x border-x-gray-600">
                    Available Stock
                  </th>
                  <th className="text-left p-3 border-x border-x-gray-600">
                    Units Sold
                  </th>
                  <th className="text-left p-3">Calculated Demand Forecast</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-3 border-y border-y-gray-300">
                        {product.name}
                      </td>
                      <td className="p-3 border border-x-gray-600 border-y-gray-300">
                        {product.category}
                      </td>
                      <td className="p-3 border border-x-gray-600 border-y-gray-300">
                        ${Number.parseFloat(product.cost_price).toFixed(2)}
                      </td>
                      <td className="p-3 border border-x-gray-600 border-y-gray-300">
                        ${Number.parseFloat(product.selling_price).toFixed(2)}
                      </td>
                      <td className="p-3 border border-x-gray-600 border-y-gray-300">
                        {product.stock_available.toLocaleString()}
                      </td>
                      <td className="p-3 border border-x-gray-600 border-y-gray-300">
                        {product.units_sold.toLocaleString()}
                      </td>
                      <td
                        className={`p-3 font-semibold border-y border-y-gray-300 ${
                          index % 2 === 0 ? "bg-[#01e0b4]" : "bg-[#2b6b5f]"
                        }`}
                      >
                        {(
                          product.demand_forecast ||
                          Math.floor(product.units_sold * 1.2)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-400">
                      No products selected. Please select products from the
                      table to view their demand forecast.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
