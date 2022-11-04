package ch.gibb.aufgaben.company;


import lombok.Data;

import java.util.List;

@Data
public class Boss extends Person {

    private List<Employee> employees;

    public Boss(String name) {
        this.name = name;

    }

    public void addEmployee(Employee newEmployee) {
        employees.add(newEmployee);
    }

    public void removeEmployee(Employee employeeToRemove) {
        employees.remove(employeeToRemove);
    }
}
