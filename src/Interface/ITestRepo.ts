export interface ITestRepository{
    getTest(id:string) : Promise<any>
}