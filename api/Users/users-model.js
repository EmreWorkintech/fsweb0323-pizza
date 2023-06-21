const db = require('../../data/db-config');

function getAll() {
    return []
}

function getById(id) {
    return []
}

async function getOrdersByUser(){
    /*
        select *
        from Users
        Join Orders On Users.Id = Orders.UserId

        [
            {
                "UserId": 1,
                "Birth_Year": 1900,
                "Email": "emre@wit.com.tr",
                "Name": "Emre",
                "School": null,
                "Surname": "Şahiner",
                "Orders": []
            },
            {
                "UserId": 12,
                "Birth_Year": 1900,
                "Email": "emre@wit.com.tr",
                "Name": "Emre",
                "School": null,
                "Surname": "Şahiner",
                "Orders": [ {
                    "OrderId": 1,
                    "Total_Price": 101.5,
                },
                {
                    "OrderId": 1,
                    "Total_Price": 101.5,
                }
            ]
            }
        ]

    */
    const rawData = await db('Users as u')
                            .leftJoin('Orders as o', 'u.Id', 'o.UserId')
                            .select('u.Name',
                                    'u.Surname',
                                    'u.Id as UserId',
                                    'u.Email',
                                    'u.School',
                                    'u.Birth_Year',
                                    'u.School',
                                    'o.Id as OrderId',
                                    'Total_Price'
                                    )
                            .orderBy('UserId');
    
    const result = rawData.reduce((acc,item)=>{
        const registeredUser = acc.find(user=>user.UserId === item.UserId);

        if(!registeredUser){

            if(!item.OrderId){//1. yeni user ve order yok => user ve order'ı [] olarak ekleyeceğim.
                const newUser = {
                    Birth_Year: item.Birth_Year,
                    Email: item.Email,
                    School: item.School,
                    Name: item.Name,
                    Surname: item.Surname,
                    UserId: item.UserId,
                    Orders: []
                }

                acc.push(newUser);
                return acc;

            }else { //2. yeni user ve order var => user ve order'ı ekleyeceğim
                const newUser = {
                    Birth_Year: item.Birth_Year,
                    Email: item.Email,
                    School: item.School,
                    Name: item.Name,
                    Surname: item.Surname,
                    UserId: item.UserId,
                    Orders: [{
                        OrderId: item.OrderId,
                        Total_Price: item.Total_Price
                    }]
                }

                acc.push(newUser);
                return acc;
            }
            
        } else {
      
                // 3. eski user ama yeni order'ı var => order'ı eski user'a ekleyeceğim.
                      
            //registeredUser
            //regiteredUser.Orders

            const newOrder = {
                OrderId: item.OrderId,
                Total_Price: item.Total_Price
            }

            registeredUser.Orders.push(newOrder);
            return acc;
        }
        
    },[])
    
    
    return result;

}

module.exports = {
    getAll,
    getById,
    getOrdersByUser
}