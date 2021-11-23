export default class Group {
    id?: string;
    name!: string;
    permissions!: Array<Permission>;
}

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'; 