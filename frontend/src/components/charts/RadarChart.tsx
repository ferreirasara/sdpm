import React from 'react';
import Chart from 'bizcharts/lib/components/Chart';
import Coordinate from 'bizcharts/lib/components/Coordinate';
import Line from 'bizcharts/lib/geometry/Line';

const RadarChart = (props: {
  data: {
    area: { value: number }, extraFeatures: { value: number },
    total: number, location: { value: number }, price: { value: number }
  }
}) => {

  const data = [
    { item: 'Geral', score: props.data.total || 0 },
    { item: 'Preço', score: (props.data.price && props.data.price.value) || 0 },
    { item: 'Localização', score: (props.data.location && props.data.location.value) || 0 },
    { item: 'Adicionais', score: (props.data.extraFeatures && props.data.extraFeatures.value) || 0 },
    { item: 'Área', score: (props.data.area && props.data.area.value) || 0 }
  ]

  return (
    <div>
      <Chart
        height={360}
        data={data}
        padding={[20, 20, 95, 20]}
        scale={{
          score: {
            min: 0, max: 1,
            formatter: (score: number) => Math.round(score * 100)
          },
        }}
        autoFit
      >
        <Coordinate type="polar" radius={0.8} />
        <Line
          position="item*score"
          size="2"
        />
      </Chart>
    </div >
  );
}

export default RadarChart;