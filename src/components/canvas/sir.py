from abc import ABC , abstractmethod

class Vehical(ABC):
    @abstractmethod
    def __init__(self,veh_type,veh_name,veh_ms,veh_acc):
        self.typ =veh_type
        self.name =veh_name
        self.maxSpeed=veh_ms
        self.acc_val=veh_acc

    @abstractmethod
    def accelerate(self):
        pass

    @abstractmethod
    def apply_brake(self):
        pass

    @abstractmethod
    def display_details(self):
        pass
class Car(Vehical):
    def __init__(self,veh_type,veh_name,veh_ms,veh_acc):
        print("car constructuror method")
        super().__init__(veh_type,veh_name,veh_ms,veh_acc)
    
    def accelerate(self):
        print()
    
    def apply_brake(self):
        print()
    
    def display_details(self):
        print("display details method")
        print(self.typ)
        print(self.name)
        print(self.maxSpeed)

c = Car("car","kia",100,12)
print(c)
c.display_details()

#polymorphism

