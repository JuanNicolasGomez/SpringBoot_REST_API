package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    @Autowired
    RestaurantOrderServices ros;

    
    @Test
    public void contextLoads() throws OrderServicesException{
    }
    
    /**
     * Clase de equivalencia1: calcular impuesto de bebida.
     *                          resultado esperado: valor bebida*(1+0.16)
     * 
     */
    @Test
    public void claseDeEquivalencia1(){
        Order o = new Order(1);
        o.addDish("COKE", 1);
        try {
            ros.releaseTable(1);
            System.out.println("entraa");
            ros.addNewOrderToTable(o);
            System.out.println("entraa2222");
            assertEquals(1508,ros.calculateTableBill(1));
        } catch (OrderServicesException ex) {
            //ex.printStackTrace();
            fail("Ha ocurrido un error");
        }
    }
    
    /**
     * Clase de equivalencia2: calcular impuesto de otro elemento.
     *                          resultado esperado: valor plato*(1 + 0.19)
     * 
     */
    @Test
    public void claseDeEquivalencia2(){
        Order o = new Order(1);
        o.addDish("PIZZA", 1);
        try {
            ros.releaseTable(1);
            ros.addNewOrderToTable(o);
            assertEquals(11900,ros.calculateTableBill(1));
        } catch (OrderServicesException ex) {
            fail("Ha ocurrido un error");
        }
    }
}
