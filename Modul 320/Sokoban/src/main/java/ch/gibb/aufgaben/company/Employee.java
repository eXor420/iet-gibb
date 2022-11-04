package ch.gibb.aufgaben.company;

import lombok.Data;

@Data
public class Employee extends Person {
    public Employee(float salary, String name) {
        this.salary = salary;
        this.name = name;
    }

    private float salary;
}
