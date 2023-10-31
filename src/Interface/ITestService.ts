export interface ITestService{
    getTest(id:string) : Promise<any>
}