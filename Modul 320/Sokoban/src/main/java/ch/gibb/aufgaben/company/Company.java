package ch.gibb.aufgaben.company;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Company {
    public Company(String name) {
        this.name = name;
    }

    private String name;

    private Boss chef;
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee newEmployee) {
        employees.add(newEmployee);
    }

    public void removeEmployee(Employee employeeToRemove) {
        employees.remove(employeeToRemove);
    }


    @Override
    public String toString() {
        StringBuilder organigramm = new StringBuilder(chef.name);
        for (Employee employee : employees) {
            organigramm.append("\n ├───").append(employee.name);
        }
        return organigramm.toString();

    }

    public void setChef(Boss chef) {
        this.chef = chef;
    }
}
