const employees = [
  {
    id: 1,
    firstName: "Aarav",
    email: "employee1@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Prepare monthly report",
        description: "Compile and summarize the financial report for April.",
        date: "2025-05-03",
        category: "Finance"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Attend training session",
        description: "Complete the cybersecurity awareness training.",
        date: "2025-04-25",
        category: "Training"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Submit project update",
        description: "Send the progress report for Project X.",
        date: "2025-04-20",
        category: "Project Management"
      }
    ]
  },
  {
    id: 2,
    firstName: "Ishaan",
    email: "employee2@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Design homepage layout",
        description: "Create a modern layout for the company homepage.",
        date: "2025-05-05",
        category: "Design"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Fix mobile navbar bug",
        description: "Resolve the menu toggle issue on mobile devices.",
        date: "2025-05-02",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Deploy landing page",
        description: "Push the updated landing page to production.",
        date: "2025-04-28",
        category: "Deployment"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Create test cases",
        description: "Add test cases for the login module.",
        date: "2025-04-22",
        category: "QA"
      }
    ]
  },
  {
    id: 3,
    firstName: "Vihaan",
    email: "employee3@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Conduct team meeting",
        description: "Host weekly check-in with the frontend team.",
        date: "2025-05-04",
        category: "Management"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Review resumes",
        description: "Evaluate resumes for the intern role.",
        date: "2025-04-30",
        category: "HR"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Submit client feedback",
        description: "Send feedback report to the client after demo.",
        date: "2025-04-24",
        category: "Client Relations"
      }
    ]
  },
  {
    id: 4,
    firstName: "Aryan",
    email: "employee4@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 2
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Update user dashboard",
        description: "Redesign the user dashboard for better UX.",
        date: "2025-05-05",
        category: "UI/UX"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Run A/B testing",
        description: "Execute A/B tests for signup flow.",
        date: "2025-05-03",
        category: "Marketing"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Optimize images",
        description: "Compress all homepage images for faster loading.",
        date: "2025-04-27",
        category: "Performance"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Fix user auth bug",
        description: "Resolve login issue on Safari browsers.",
        date: "2025-04-21",
        category: "Bug Fixes"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Integrate payment API",
        description: "Link PayPal API with checkout flow.",
        date: "2025-04-18",
        category: "Integration"
      }
    ]
  },
  {
    id: 5,
    firstName: "Kabir",
    email: "employee5@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Write documentation",
        description: "Complete API documentation for developers.",
        date: "2025-05-04",
        category: "Documentation"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Sync with backend team",
        description: "Coordinate data schema updates.",
        date: "2025-05-03",
        category: "Coordination"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Update README",
        description: "Add setup instructions and API usage.",
        date: "2025-04-26",
        category: "Documentation"
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    firstName: "Neha",
    email: "admin@example.com",
    password: "123"
  }
];


export const setLocalStorage = ()=>{
   localStorage.setItem('employees',JSON.stringify(employees))
   localStorage.setItem('admin',JSON.stringify(admin))
}
export const getLocalStorage = ()=>{
  const employees = JSON.parse(localStorage.getItem('employees')) 
  const admin = JSON.parse(localStorage.getItem('admin')) 

  return{employees, admin}
}