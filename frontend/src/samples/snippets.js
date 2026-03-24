export const snippets = [
  {
    label: "Animal Kingdom",
    description: "Basic inheritance chain",
    code: `
public abstract class LivingThing {
    private boolean alive;
    public void breathe() {}
    public void eat() {}
}

public abstract class Animal extends LivingThing {
    private String name;
    private int age;
    public abstract void makeSound();
    public void sleep() {}
    public String getName() { return name; }
}

public class Dog extends Animal {
    private String breed;
    public void makeSound() {}
    public void fetch() {}
    public String getBreed() { return breed; }
}

public class Cat extends Animal {
    private boolean isIndoor;
    public void makeSound() {}
    public void purr() {}
}

public class Puppy extends Dog {
    private boolean isVaccinated;
    public void play() {}
    public void makeSound() {}
}
`.trim(),
  },

  {
    label: "Vehicle System",
    description: "Abstract class + interfaces",
    code: `
public interface Drivable {
    void accelerate();
    void brake();
    int getSpeed();
}

public interface Electric {
    void charge();
    int getBatteryLevel();
}

public abstract class Vehicle implements Drivable {
    private String brand;
    private int year;
    public abstract void fuelUp();
    public void service() {}
    public String getBrand() { return brand; }
}

public class Car extends Vehicle {
    private int doors;
    public void fuelUp() {}
    public void accelerate() {}
    public void brake() {}
    public int getSpeed() { return 0; }
}

public class ElectricCar extends Car implements Electric {
    private int batteryCapacity;
    public void charge() {}
    public int getBatteryLevel() { return 0; }
    public void fuelUp() {}
}

public class Truck extends Vehicle {
    private double payload;
    public void fuelUp() {}
    public void accelerate() {}
    public void brake() {}
    public int getSpeed() { return 0; }
}
`.trim(),
  },

  {
    label: "Banking System",
    description: "Multilevel inheritance + encapsulation",
    code: `
public abstract class Account {
    private String accountNumber;
    private double balance;
    private String ownerName;
    public abstract double calculateInterest();
    public void deposit(double amount) {}
    public void withdraw(double amount) {}
    public double getBalance() { return balance; }
}

public class SavingsAccount extends Account {
    private double interestRate;
    private int withdrawalLimit;
    public double calculateInterest() { return 0; }
    public void applyInterest() {}
    public int getWithdrawalLimit() { return withdrawalLimit; }
}

public class CurrentAccount extends Account {
    private double overdraftLimit;
    public double calculateInterest() { return 0; }
    public void enableOverdraft() {}
    public double getOverdraftLimit() { return overdraftLimit; }
}

public class PremiumSavings extends SavingsAccount {
    private boolean hasLocker;
    private double bonusRate;
    public double calculateInterest() { return 0; }
    public void applyBonus() {}
}

public class Customer {
    private String name;
    private String email;
    private Account account;
    public void openAccount() {}
    public void closeAccount() {}
    public Account getAccount() { return account; }
}
`.trim(),
  },

  {
    label: "Shape Hierarchy",
    description: "Interface + polymorphism",
    code: `
public interface Drawable {
    void draw();
    void resize(double factor);
}

public interface Colorable {
    void setColor(String color);
    String getColor();
}

public abstract class Shape implements Drawable, Colorable {
    private String color;
    private double x;
    private double y;
    public abstract double getArea();
    public abstract double getPerimeter();
    public void setColor(String color) {}
    public String getColor() { return color; }
    public void move(double x, double y) {}
}

public class Circle extends Shape {
    private double radius;
    public double getArea() { return 0; }
    public double getPerimeter() { return 0; }
    public void draw() {}
    public void resize(double factor) {}
}

public class Rectangle extends Shape {
    private double width;
    private double height;
    public double getArea() { return 0; }
    public double getPerimeter() { return 0; }
    public void draw() {}
    public void resize(double factor) {}
}

public class Square extends Rectangle {
    public double getSide() { return 0; }
    public void draw() {}
}
`.trim(),
  },
];