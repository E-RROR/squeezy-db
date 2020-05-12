/**
 * removeItem function, use this to get find data and remote it from your collection
 */
import {getCollection} from '../_serializer/getCollection';
import {toCollection} from '../_serializer/toCollection';
import {getItem} from '../getItem/getItem';

export const removeItem = (collection: string, remove: object, success: (arg0: any) => void, failure: (arg0: any) => void) => {

    /* Check search param */
    if (typeof remove !== 'object' || remove === null) {
        throw new Error('remove must be object');
    };

    /* find that object exist */
    getItem(
        collection,
        remove,
        (finded) => {
            if (finded !== undefined) {
                // object is exist
                // now we can get all objects
                getCollection(collection, 
                    (allObjects) => {
                        let filtered_list: object;
                        // filter
                        filtered_list = allObjects.filter((item: object) =>  JSON.stringify(finded) !== JSON.stringify(item));

                        // Now save new collection objects
                        toCollection(
                            collection,
                            filtered_list,
                            () => {
                                success(true);
                            },
                            (error) => {
                                failure(error);
                            },
                            true
                        );
                    }, 
                    (error) => {failure(error)}
                );
            }
            else {
                failure('object not exists');
            };
        },
        (error) => {
            failure(error);
        }
    );

};