export interface TreeNode {
  id: string;
  server_name: string;
  folder_path: string;
  count: number;
  children?: TreeNode[];
  link?: string;
}

export const fileTreeData: TreeNode[] = [
  {
    id: "level-1-prod",
    server_name: "Production_Data",
    folder_path: "/prod",
    count: 156,
    children: [
      {
        id: "level-2-finance",
        server_name: "Finance_Reports",
        folder_path: "/prod/finance",
        count: 89,
        children: [
          {
            id: "level-3-quarterly",
            server_name: "Quarterly_Analysis",
            folder_path: "/prod/finance/quarterly",
            count: 45,
            children: [
              {
                id: "level-4-q1-2024",
                server_name: "Q1_2024",
                folder_path: "/prod/finance/quarterly/q1_2024",
                count: 23,
                children: [
                  {
                    id: "level-5-jan",
                    server_name: "January",
                    folder_path: "/prod/finance/quarterly/q1_2024/jan",
                    count: 12,
                    children: [
                      {
                        id: "level-6-weekly",
                        server_name: "Weekly_Reports",
                        folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly",
                        count: 8,
                        children: [
                          {
                            id: "level-7-w1",
                            server_name: "Week_01",
                            folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly/w01",
                            count: 5,
                            children: [
                              {
                                id: "level-8-daily",
                                server_name: "Daily_Transactions",
                                folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly/w01/daily",
                                count: 3,
                                children: [
                                  {
                                    id: "level-9-records",
                                    server_name: "Transaction_Records",
                                    folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly/w01/daily/records",
                                    count: 2,
                                    children: [
                                      {
                                        id: "level-10-source",
                                        server_name: "Source_Files",
                                        folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly/w01/daily/records/source",
                                        count: 1,
                                        link: "https://www.2345.com"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                id: "level-7-w2",
                                server_name: "Week_02",
                                folder_path: "/prod/finance/quarterly/q1_2024/jan/weekly/w02",
                                count: 4
                              }
                            ]
                          },
                          {
                            id: "level-6-monthly",
                            server_name: "Monthly_Summary",
                            folder_path: "/prod/finance/quarterly/q1_2024/jan/monthly",
                            count: 4
                          }
                        ]
                      },
                      {
                        id: "level-5-feb",
                        server_name: "February",
                        folder_path: "/prod/finance/quarterly/q1_2024/feb",
                        count: 10
                      },
                      {
                        id: "level-5-mar",
                        server_name: "March",
                        folder_path: "/prod/finance/quarterly/q1_2024/mar",
                        count: 8
                      }
                    ]
                  },
                  {
                    id: "level-4-q2-2024",
                    server_name: "Q2_2024",
                    folder_path: "/prod/finance/quarterly/q2_2024",
                    count: 22
                  }
                ]
              },
              {
                id: "level-3-annual",
                server_name: "Annual_Reports",
                folder_path: "/prod/finance/annual",
                count: 44
              }
            ]
          },
          {
            id: "level-2-hr",
            server_name: "HR_Records",
            folder_path: "/prod/hr",
            count: 67
          },
          {
            id: "level-2-sales",
            server_name: "Sales_Data",
            folder_path: "/prod/sales",
            count: 123
          }
        ]
      }
    ]
  },
  {
    id: "level-1-staging",
    server_name: "Staging_Environment",
    folder_path: "/staging",
    count: 89,
    children: [
      {
        id: "level-2-test",
        server_name: "Test_Suites",
        folder_path: "/staging/test",
        count: 45,
        children: [
          {
            id: "level-3-unit",
            server_name: "Unit_Tests",
            folder_path: "/staging/test/unit",
            count: 28,
            children: [
              {
                id: "level-4-modules",
                server_name: "Modules",
                folder_path: "/staging/test/unit/modules",
                count: 15,
                children: [
                  {
                    id: "level-5-api",
                    server_name: "API_Tests",
                    folder_path: "/staging/test/unit/modules/api",
                    count: 8,
                    children: [
                      {
                        id: "level-6-v1",
                        server_name: "Version_1",
                        folder_path: "/staging/test/unit/modules/api/v1",
                        count: 4,
                        children: [
                          {
                            id: "level-7-endpoints",
                            server_name: "Endpoints",
                            folder_path: "/staging/test/unit/modules/api/v1/endpoints",
                            count: 2,
                            children: [
                              {
                                id: "level-8-auth",
                                server_name: "Auth_Tests",
                                folder_path: "/staging/test/unit/modules/api/v1/endpoints/auth",
                                count: 1,
                                children: [
                                  {
                                    id: "level-9-oauth",
                                    server_name: "OAuth_Scenarios",
                                    folder_path: "/staging/test/unit/modules/api/v1/endpoints/auth/oauth",
                                    count: 1,
                                    children: [
                                      {
                                        id: "level-10-grant",
                                        server_name: "Grant_Types",
                                        folder_path: "/staging/test/unit/modules/api/v1/endpoints/auth/oauth/grant",
                                        count: 1,
                                        link: "https://www.2345.com"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "level-3-integration",
            server_name: "Integration_Tests",
            folder_path: "/staging/test/integration",
            count: 17
          }
        ]
      }
    ]
  }
];
