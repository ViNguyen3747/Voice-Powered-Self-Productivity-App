import { useQuery } from "@apollo/client";
import { weeklyCategoriesOptions } from "../../components/common/Data";
import { GET_TASKS } from "../../utils/graphQL/query";
import formatDate from "../formatDate";

const useWeeklyReport = () => {
  let weeklyData;
  let today = new Date();
  let week = [];
  for (let i = 7; i >= 0; i--) {
    let first = today.getTime() - i * 24 * 60 * 60 * 1000;
    let day = new Date(first);
    week.push({
      date: day,
      categories: JSON.parse(JSON.stringify(weeklyCategoriesOptions)),
    });
  }

  const { loading, error, data } = useQuery(GET_TASKS);
  if (data) {
    const tasks = data.tasks;
    const weeklyTasks = tasks.filter((task) => {
      let date = new Date(task.date);
      let contain = week.some((d) => d.date.getDate() === date.getDate());
      return contain;
    });
    week.map((d) => {
      let dailyTasks = weeklyTasks.filter((task) => {
        let dateTask = new Date(task.date);
        let daily = new Date(d.date);
        return daily.getDate() === dateTask.getDate();
      });
      if (dailyTasks) {
        dailyTasks.forEach((t) => {
          const category = d.categories.find((c) => c.value === t.category);
          if (category) category.total += t.duration;
        });
      }
    });

    // const weeklyFilteredCategories = week.filter((d) => c.total > 0);
    weeklyData = {
      datasets: [
        {
          label: "Professional",
          data: week.map((d) => d.categories[0].total),
          backgroundColor: weeklyCategoriesOptions[0].color,
        },
        {
          label: "Physical",
          data: week.map((d) => d.categories[1].total),
          backgroundColor: weeklyCategoriesOptions[1].color,
        },
        {
          label: "Pratical",
          data: week.map((d) => d.categories[2].total),
          backgroundColor: weeklyCategoriesOptions[2].color,
        },
        {
          label: "Social",
          data: week.map((d) => d.categories[3].total),
          backgroundColor: weeklyCategoriesOptions[3].color,
        },
        {
          label: "Spiritual",
          data: week.map((d) => d.categories[4].total),
          backgroundColor: weeklyCategoriesOptions[4].color,
        },
        {
          label: "Mental",
          data: week.map((d) => d.categories[5].total),
          backgroundColor: weeklyCategoriesOptions[5].color,
        },
        {
          label: "Emotional",
          data: week.map((d) => d.categories[6].total),
          backgroundColor: weeklyCategoriesOptions[6].color,
        },
      ],
      labels: week.map((d) => formatDate(d.date)),
      strokeColor: "white",
    };
    localStorage.setItem("weeklyreport", JSON.stringify(weeklyData));
  } else {
    weeklyData = JSON.parse(localStorage.getItem("weeklyreport"));
  }

  return [weeklyData];
};

export default useWeeklyReport;
