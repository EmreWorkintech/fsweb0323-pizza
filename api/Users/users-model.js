const db = require('../../data/db-config');

function getAll() {
    return db('Users');
}

function getById(id) {
    return db('Users').where('id', id).first();
}

function getByFilter(filter) {
    return db('Users').where(filter);
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

        const newOrder = {
            OrderId: item.OrderId,
            Total_Price: item.Total_Price
        }


        if(!registeredUser){//1. yeni user ve order yok => user ve order'ı [] olarak ekleyeceğim.
            
            const newUser = {
                Birth_Year: item.Birth_Year,
                Email: item.Email,
                School: item.School,
                Name: item.Name,
                Surname: item.Surname,
                UserId: item.UserId,
                Orders: []
            }

            if(item.OrderId){
                //2. yeni user ve order var => user ve order'ı ekleyeceğim
                newUser.Orders.push(newOrder);

            }

            acc.push(newUser);

        } else {
      
                // 3. eski user ama yeni order'ı var => order'ı eski user'a ekleyeceğim.
                      
            //registeredUser
            //regiteredUser.Orders

            registeredUser.Orders.push(newOrder);
            
        }

        return acc;
        
    },[])
    
    
    return result;

}

async function create(payload) {
    const [id] = await db('Users').insert(payload);
    const user = await getById(id);
    return user
}


module.exports = {
    getAll,
    getById,
    getOrdersByUser,
    create,
    getByFilter,
}