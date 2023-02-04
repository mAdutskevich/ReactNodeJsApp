import React from 'react';

export type ISVGComponent = React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
