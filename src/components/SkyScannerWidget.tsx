'use client';

import React, { FC } from 'react';

interface SkyScannerWidgetProps {
  type: 'flights' | 'hotels' | 'cars';
}

export const SkyScannerWidget: FC<SkyScannerWidgetProps> = ({ type }) => {
  return (
    <div className="p-4 text-center text-muted-foreground border-2 border-dashed border-muted rounded-lg bg-muted/10">
      <p className="text-sm">SkyScannerWidget for {type} will be implemented here</p>
    </div>
  );
};
