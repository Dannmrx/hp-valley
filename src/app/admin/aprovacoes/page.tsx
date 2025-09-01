
"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type PendingUser = {
    id: string;
    name: string;
    email: string;
    phone: string;
    passport: string;
}

export default function AprovacoesPage() {
    const { userData, loading: authLoading } = useAuth();
    const router = useRouter();
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [isUpdating, startUpdateTransition] = useTransition();
    const { toast } = useToast();

    useEffect(() => {
        if (!authLoading && !userData?.isAdmin) {
            router.replace("/");
        }
    }, [userData, authLoading, router]);

    useEffect(() => {
        if (userData?.isAdmin) {
            const fetchPendingUsers = async () => {
                setLoadingUsers(true);
                try {
                    const q = query(collection(db, "users"), where("status", "==", "pending"));
                    const querySnapshot = await getDocs(q);
                    const users: PendingUser[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        users.push({
                            id: doc.id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            passport: data.passport,
                        });
                    });
                    setPendingUsers(users);
                } catch (error) {
                    console.error("Error fetching pending users:", error);
                    toast({ variant: "destructive", title: "Erro", description: "Não foi possível carregar os usuários pendentes." });
                } finally {
                    setLoadingUsers(false);
                }
            };
            fetchPendingUsers();
        }
    }, [userData, toast]);

    const handleUserUpdate = (userId: string, newStatus: 'approved' | 'rejected') => {
        startUpdateTransition(async () => {
            try {
                const userDocRef = doc(db, "users", userId);
                await updateDoc(userDocRef, { status: newStatus });
                setPendingUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                toast({ title: "Sucesso", description: `Usuário ${newStatus === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso.` });
            } catch (error) {
                 toast({ variant: "destructive", title: "Erro", description: "Não foi possível atualizar o status do usuário." });
            }
        });
    }

    if (authLoading || loadingUsers) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!userData?.isAdmin) {
        return null; 
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Aprovações Pendentes</h1>
            <p className="text-muted-foreground">
                Gerencie os novos usuários que estão aguardando aprovação para acessar o sistema.
            </p>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Passaporte</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Nenhum usuário pendente de aprovação.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendingUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.passport}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleUserUpdate(user.id, 'approved')} disabled={isUpdating} className="text-green-600 hover:text-green-700">
                                                <CheckCircle className="h-5 w-5"/>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleUserUpdate(user.id, 'rejected')} disabled={isUpdating} className="text-red-600 hover:text-red-700">
                                                <XCircle className="h-5 w-5"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
