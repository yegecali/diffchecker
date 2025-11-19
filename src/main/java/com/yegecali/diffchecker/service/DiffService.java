package com.yegecali.diffchecker.service;

import com.yegecali.diffchecker.resource.LineaComparacion;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@ApplicationScoped
public class DiffService {

    private static final Logger log = Logger.getLogger(DiffService.class.getName());

    @Inject
    Template diff;

    /**
     * Compara dos textos y retorna el HTML con las diferencias
     */
    public String generateDiffHtml(String antes, String despues) {
        log.info("Generando diff entre textos");

        List<LineaComparacion> lineasAntes = new ArrayList<>();
        List<LineaComparacion> lineasDespues = new ArrayList<>();

        // Procesar líneas del texto ANTES
        for (String linea : antes.split("\n", -1)) {
            lineasAntes.add(new LineaComparacion(escapeHtml(linea)));
        }

        // Procesar líneas del texto DESPUÉS
        for (String linea : despues.split("\n", -1)) {
            lineasDespues.add(new LineaComparacion(escapeHtml(linea)));
        }

        // Renderizar plantilla Qute
        TemplateInstance instance = diff
            .data("lineasAntes", lineasAntes)
            .data("lineasDespues", lineasDespues);

        return instance.render();
    }

    /**
     * Escapa caracteres HTML especiales
     */
    private String escapeHtml(String text) {
        if (text == null || text.isEmpty()) {
            return "&nbsp;";
        }
        return text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#39;");
    }
}
