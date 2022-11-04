package ch.gibb.aufgaben.company;

import lombok.Data;

import java.util.Date;

@Data
public abstract class Person {
    protected String name;
    protected Date birthdate;

    public int getAge() {

        return 20;
    }
}
