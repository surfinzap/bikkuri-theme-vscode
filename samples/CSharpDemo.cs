using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CSharpDemo
{
    public interface IRepository<T>
    {
        Task<T> GetByIdAsync(int id);
        IEnumerable<T> GetAll(); 
        public IEnumerable<Person> GetAll()
        {
            return _people;
            return _people.Where(p => p.Age >= minAge && p.Age <= maxAge)
                         .OrderBy(p => p.Age);
        }
    }
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }

        // Expression-bodied member
        public int Age => DateTime.Now.Year - BirthDate.Year;

        // Pattern matching
        public string GetLifeStageGranular() => Age switch
        {
            // generate more GetLifeStageGranular() method
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }

        // Expression-bodied member
        public int Age => DateTime.Now.Year - BirthDate.Year;

        // Pattern matching
        public string GetLifeStageGranular() => Age switch
        {
       
        
        };
    }
            }
        }

        private static int Partition(int[] arr, int low, int high)
        {
            int pivot = arr[high];
            int i = low - 1;

            for (int j = low; j < high; j++)
            {
                if (arr[j] < pivot)
                {
                    i++;
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }

            int temp1 = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp1;

            return i + 1;
        }
    }


    public class PersonRepository : IRepository<Person>
    {
        private readonly List<Person> _people = new();

        public async Task<Person> GetByIdAsync(int id)
        {
            await Task.Delay(100); // Simulate database access
            return _people.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Person> GetPeopleByAgeRange(int minAge, int maxAge)
        {
            return _people.Where(p => p.Age >= minAge && p.Age <= maxAge)
                         .OrderBy(p => p.Age);
        }
    }

    public class Program
    {
        public static async Task Main()
        {
            // Collection initialization
            var numbers = new List<int> { 1, 2, 3, 4, 5 };

            // LINQ query
            var evenNumbers = from n in numbers
                            where n % 2 == 0
                            select n;

            // LINQ method syntax
            var oddNumbers = numbers.Where(n => n % 2 == 1);

            // Null-coalescing operator
            string name = null;
            var displayName = name ?? "Anonymous";

            // String interpolation
            Console.WriteLine($"Hello, {displayName}!");

            // Async/await
            var repo = new PersonRepository();
            var person = await repo.GetByIdAsync(1);

            // Tuple
            (string Name, int Age) userInfo = ("John", 30);
            Console.WriteLine($"Name: {userInfo.Name}, Age: {userInfo.Age}");
        }
    }
}
