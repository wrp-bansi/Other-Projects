import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getAllProductsFromDB } from '../../../Helper/indexedDB';
import Layout from '../../../Components/Layout/layout';
import { showToast } from '../../../Components/Comman/Tostityfy/toast';

const ReportPage = () => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const products = await getAllProductsFromDB();
        if (products && products.length > 0) {
          const latestProducts = products.slice(-10);
          const stockData = latestProducts.map(product => product.stock);
          const labels = latestProducts.map(product => product.productTitle);

          const updatedChartData = {
            labels: labels,
            datasets: [
              {
                label: 'Stock Level',
                data: stockData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }
            ]
          };


          setChartData(updatedChartData);
        }
      } catch (error) {

        showToast('Error fetching products from IndexedDB:', 'error')
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar', // Change chart type to bar
        data: chartData
      });

      // Store the chart instance in the ref
      chartRef.current = newChart;
    }
  }, [chartData]);

  return (
    <>
      <Layout />
      <main style={{ marginLeft: '150px', marginTop: '90px' }}>
        <div>
          <h2>Stock Report</h2>
          <div style={{ height: '400px', width: '85%' }}>
            <canvas id="bar-chart" ref={chartRef}></canvas>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportPage;
