//Enable .json file imports
declare module "*.json" {
    const value: any;
    export default value;
}