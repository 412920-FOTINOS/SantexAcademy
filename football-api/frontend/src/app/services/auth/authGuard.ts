import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    return !!token; // Solo permite acceso si hay token
};