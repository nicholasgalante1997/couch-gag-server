import { User } from '@nickgdev/couch-gag-common-lib';
import { firestore } from '../utils/google/firestore';


export async function createUser(user: User) {
    const doc = firestore.doc('users');
    try {
        const _ = await doc.set({
            [user.id]: user
        });
    } catch (e: any) {

    }
}