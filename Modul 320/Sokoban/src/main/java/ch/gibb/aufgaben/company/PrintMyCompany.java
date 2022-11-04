package ch.gibb.aufgaben.company;

public class PrintMyCompany {

    public static void main(String[] args) {
        Company ims = new Company("IMS AG");

        for (int i = 1; i <= 10; i++) {
            Employee employee = new Employee(i * 100, "Employee Nr. " + i);
            ims.addEmployee(employee);
        }
        Boss ruegg = new Boss("Kurt Rüegg");
        ims.setChef(ruegg);
        System.out.println(ims);

    }


}
