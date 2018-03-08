/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/orders")

public class OrdersAPIController {
    RestaurantOrderServices ros;
    
    @Autowired
    public void setService(RestaurantOrderServices ros){
        this.ros = ros;
    }
    
    /**
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> controllerGetOrders(){
        try{
            Order order;
            Set<Integer> tables = ros.getTablesWithOrders();
            List<Order> orders =  new ArrayList<>();
            for(Integer t: tables){
                order = ros.getTableOrder(t);
                orders.add(order);
               
            }
            return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
        }catch (Exception ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Ha ocurrido un error en la peticion",HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> controllerGetOrderByTableId(@PathVariable int id){
        
        Order order;
        order = ros.getTableOrder(id);
    
        if (order == null){
            return new ResponseEntity<>("Mesa indicada no existe o no tiene ordenes",HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        }
        
    }
    
    @GetMapping("/{id}/total")
    public ResponseEntity<?> contollerGetTotalById(@PathVariable int id){
        try {
            return new ResponseEntity<>(ros.calculateTableBill(id),HttpStatus.ACCEPTED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST)	
    public ResponseEntity<?> controllerPostOrder(@RequestBody Order o){
        try {
            ros.addNewOrderToTable(o);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN);
        }      

    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> controllerAddProductToOrder(@RequestBody Order order, @PathVariable int id){
        try {
            ros.releaseTable(id);
        } catch (OrderServicesException e) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
        }
        try {
            ros.addNewOrderToTable(order);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (OrderServicesException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> controllerDeleteOrderItem(@PathVariable int id){
        try {
            ros.releaseTable(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
