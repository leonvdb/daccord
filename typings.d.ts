//Enable .json file imports
declare module "*.json" {
    const value: any;
    export default value;
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }