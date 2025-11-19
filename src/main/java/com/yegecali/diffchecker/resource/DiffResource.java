package com.yegecali.diffchecker.resource;

import com.yegecali.diffchecker.service.DiffService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import io.quarkus.qute.Template;
import jakarta.inject.Inject;
import java.util.logging.Logger;
import java.util.logging.Level;

@Path("/api/diff")
public class DiffResource {

    private static final Logger log = Logger.getLogger(DiffResource.class.getName());

    private final DiffService diffService;

    @Inject
    Template info;

    public DiffResource(DiffService diffService) {
        this.diffService = diffService;
    }

    /**
     * Endpoint POST que recibe "antes" y "después" y retorna HTML con las diferencias
     */
    @POST
    @Path("/compare")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_HTML)
    public Response comparar(DiffRequest request) {
        log.log(Level.INFO, "=== INICIO DE COMPARACIÓN ===");
        log.log(Level.INFO, "Content-Type esperado: application/json");

        try {
            log.log(Level.FINE, "Request recibido: " + request);

            if (request == null || request.getAntes() == null || request.getDespues() == null) {
                log.log(Level.WARNING, "Request inválido - antes: " + (request != null ? request.getAntes() : "null") +
                        ", despues: " + (request != null ? request.getDespues() : "null"));
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity("<html><body><h1>Error</h1><p>Debes proporcionar 'antes' y 'despues'</p></body></html>")
                    .build();
            }

            log.log(Level.INFO, "✓ Comparando textos - Antes: " + request.getAntes().length() + " caracteres, Después: " + request.getDespues().length() + " caracteres");

            String html = diffService.generateDiffHtml(request.getAntes(), request.getDespues());
            log.log(Level.INFO, "✓ HTML generado exitosamente - Tamaño: " + html.length() + " caracteres");

            return Response.ok(html).build();

        } catch (Exception e) {
            log.log(Level.SEVERE, "✗ Error al comparar textos: " + e.getMessage());
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("<html><body><h1>Error</h1><p>" + e.getMessage() + "</p></body></html>")
                .build();
        }
    }

    /**
     * Endpoint GET con parámetros query para comparar
     */
    @GET
    @Path("/compare")
    @Produces(MediaType.TEXT_HTML)
    public Response compararGet(
        @QueryParam("antes") String antes,
        @QueryParam("despues") String despues) {

        log.log(Level.INFO, "=== COMPARACIÓN GET ===");

        try {
            if (antes == null || despues == null) {
                log.log(Level.WARNING, "Parámetros GET inválidos - antes: " + antes + ", despues: " + despues);
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity("<html><body><h1>Error</h1><p>Debes proporcionar los parámetros 'antes' y 'despues'</p></body></html>")
                    .build();
            }

            log.log(Level.INFO, "✓ Comparando textos (GET) - Antes: " + antes.length() + " caracteres, Después: " + despues.length() + " caracteres");
            String html = diffService.generateDiffHtml(antes, despues);
            return Response.ok(html).build();

        } catch (Exception e) {
            log.log(Level.SEVERE, "✗ Error al comparar textos: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("<html><body><h1>Error</h1><p>" + e.getMessage() + "</p></body></html>")
                .build();
        }
    }

    /**
     * Endpoint raíz para obtener información del API
     */
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response info() {
        log.log(Level.INFO, "✓ Acceso a información del API");
        return Response.ok(info.render()).build();
    }
}
